// src/domain/repositories/UserRepository.ts
import User from '../models/Auth/User';

export default interface UserRepository {
    findByMobile(mobile: string): Promise<User | null>;
    create(user: User): Promise<User>;
    updatePassword(mobile: string, hashedPassword: string): Promise<void>;
    findAdminByMobile(mobile: string): Promise<User | null>;
    // Other methods as necessary (e.g., findById, update, delete, etc.)
}
