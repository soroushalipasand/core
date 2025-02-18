import jwt from 'jsonwebtoken';
import Transform from '../Transform';
import RoleTransform from './RoleTransform';
import { User, TransformedUser } from 'global'; // Assuming you have these interfaces globally defined

export default class UserTransform extends Transform<User, TransformedUser> {
  createToken: boolean;
  refreshToken: boolean;

  constructor() {
    super();
    this.createToken = false;
    this.refreshToken = false;
  }

  transform(
    item: User,
    createToken: boolean = false,
    refreshToken: boolean = false,
  ): TransformedUser {
    this.createToken = createToken;
    this.refreshToken = refreshToken;

    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      mobile: item.mobile,
      hasPassword: item.hasPassword,
      role: item.role ? new RoleTransform().transform(item.role) : undefined, // Handle null role
      ...this.withToken(item),
      ...this.withRefreshToken(item),
    };
  }

  private withToken(item: User): Record<string, string> {
    // Return the existing AccessToken if already present
    if (item.AccessToken) {
      return { AccessToken: item.AccessToken };
    }

    // Create a new AccessToken if requested
    if (this.createToken) {
      const AccessToken = jwt.sign(
        {
          user_mobile: item.mobile,
          user_role: item.role
            ? {
                RoleId: item.role.id,
                roleName: item.role.title,
                permissions: item.role.permissions,
              }
            : null, // Include minimal role info
        },
        process.env.JWT_TOKEN_SECRET_CODE as string,
        { expiresIn: '1h' },
      );
      return { AccessToken };
    }

    // No token required
    return {};
  }

  private withRefreshToken(item: User): Record<string, string> {
    // Return the existing RefreshToken if already present
    if (item.RefreshToken) {
      return { RefreshToken: item.RefreshToken };
    }

    // Create a new RefreshToken if requested
    if (this.refreshToken) {
      const RefreshToken = jwt.sign(
        { user_id: item.id }, // Include the user's unique ID
        process.env.REFRESH_TOKEN_SECRET_CODE as string,
        { expiresIn: '72h' },
      );
      return { RefreshToken };
    }

    // No token required
    return {};
  }
}
