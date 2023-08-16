
  
  
  
  
  async refreshAccessToken(refresh_token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Check if the refresh token is valid and belongs to a user
      const user = await this.usersService.findById(decoded.sub);

      if (!user || user.refreshToken !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate a new access token
      const payload = { sub: user.id, email: user.Email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1h', // Set your desired expiration time for the new access token
        secret: process.env.JWT_SECRET,
      });

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
  


