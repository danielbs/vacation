import { Repository, UpdateResult } from "typeorm"; // Importing TypeORM Repository and UpdateResult
import { AppDataSource } from "../config/db.config"; // Importing data source configuration
import { Vacation } from "../entity/vacation.entity"; // Importing the Vacation entity
import { CreateVacationDTO } from "../dto/vacation.dto"; // Importing DTO for creating vacations
import { User } from "../entity/user.entity"; // Importing the User entity
import { Followers } from "../entity/followers.entity"; // Importing the Followers entity
import ApiError from "../exceptions/api.error.exception"; // Importing custom error handling class

class VacationService {
    vacationRepository: Repository<Vacation> = AppDataSource.getRepository(Vacation); // Creating a repository for the Vacation entity
    userRepository: Repository<User> = AppDataSource.getRepository(User); // Creating a repository for the User entity
    followersRepository: Repository<Followers> = AppDataSource.getRepository(Followers); // Creating a repository for the Followers entity

    // Method to retrieve all vacations with optional filtering and pagination
    async getAllVacations(host: string, userId?: number | null, follow?: boolean, upcoming?: boolean, active?: boolean, limit?: number, offset?: number) {
        // Creating a query builder for the Vacation entity
        let query = this.vacationRepository.createQueryBuilder("vacation");

        // Left joining Followers to the query to get followers information
        query = query.leftJoinAndMapMany("vacation.followers", Followers, "follower", "follower.vacationId = vacation.id");

        // Adding conditions based on optional parameters for filtering
        if (follow) {
            query = query.
                leftJoinAndSelect("vacation.followers", "followers")
                .where("followers.userId = :userId", { userId });
        }
        if (upcoming) {
            query = query.andWhere("vacation.start_date > CURRENT_TIMESTAMP");
        }
        if (active) {
            query = query.andWhere("vacation.start_date <= CURRENT_TIMESTAMP AND vacation.end_date >= CURRENT_TIMESTAMP");
        }

        // Adding pagination parameters to the query
        query = query.offset(offset).limit(limit);

        // Sorting the results by start_date in ascending order
        query = query.orderBy("vacation.start_date", "ASC");

        // Executing the query to retrieve vacations and total count
        const [vacations, total] = await query.getManyAndCount();

        // Modifying each vacation object to include additional information
        for (const vacation of vacations as any) {
            if (vacation.picture) {
                vacation.picture = `${host}${vacation.picture}`;
            }
            if (userId) {
                vacation.is_following = (await this.isUserFollowingVacation(userId, vacation.id)) != null;
            }
            vacation.followers_count = vacation.followers.length;
        }

        // Returning the modified vacation data along with the total count
        return { data: vacations, total: total };
    }

    // Method to retrieve a vacation by its ID
    async getVacationById(vacationId: number) {
        const vacation = await this.vacationRepository.findOneBy({ id: vacationId });
        if (!vacation) {
            throw ApiError.NotFoundError();
        }
        return vacation;
    }

    // Method to create a new vacation
    async createVacation(createVacation: CreateVacationDTO): Promise<Vacation> {
        return await this.vacationRepository.save(createVacation);
    }

    // Method to update an existing vacation
    async updateVacation(vacationId: string, updateVacation: Partial<CreateVacationDTO>): Promise<UpdateResult> {
        const vacation = await this.vacationRepository.update(
            vacationId,
            updateVacation
        );
        return vacation;
    }

    // Method to delete a vacation by its ID
    async deleteVacation(id: string) {
        // Deleting associated followers before deleting the vacation
        await this.followersRepository.createQueryBuilder()
            .delete()
            .from(Followers)
            .where("vacationId = :id", { id })
            .execute();
        // Deleting the vacation
        return await this.vacationRepository.delete(id);
    }

    // Method to mark a user as following a vacation
    async followToVacation(userId: number, vacationId: number) {
        // Retrieving user and vacation entities
        const user = await this.userRepository.findOneBy({ id: userId });
        const vacation = await this.vacationRepository.findOneBy({ id: vacationId });
        if (!user || !vacation) {
            throw ApiError.NotFoundError();
        }

        // Creating a new follower entry
        const follower = new Followers();
        follower.user = user;
        follower.vacation = vacation;

        // Saving the new follower entry
        return await this.followersRepository.save(follower);
    }

    // Method to unmark a user from following a vacation
    async unfollowFromVacation(userId: number, vacationId: number) {
        // Finding the follower entry by user and vacation IDs
        const follower = await this.followersRepository.findOneBy({
            user: { id: userId },
            vacation: { id: vacationId }
        });
        if (!follower) {
            throw ApiError.NotFoundError();
        }
        // Removing the follower entry
        return await this.followersRepository.remove(follower);
    }

    // Method to check if a user is following a vacation
    async isUserFollowingVacation(userId: number, vacationId: number) {
        return await this.followersRepository.findOneBy({
            user: { id: userId },
            vacation: { id: vacationId }
        });
    }

    // Method to get vacations along with the count of followers for each vacation
    async getVacationsWithFollowersCount() {
        // Retrieving vacations along with followers information
        const vacationsWithFollowers = await this.vacationRepository.find({
            relations: ["followers"]
        });

        // Mapping vacation data to include destination and followers count
        const reportData = vacationsWithFollowers.map(vacation => ({
            destination: vacation.destination,
            followersCount: vacation.followers.length
        }));

        // Returning the report data
        return reportData;
    }
}

export default VacationService; // Exporting the VacationService class
