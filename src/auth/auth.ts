import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { AppDataSource } from "../db/data-source";
import { UserRepositoryImpl } from "../db/repository/UserRepositoryImpl";
import { compare } from "../utils/crypto";

const localStrategy = () =>
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, cb) => {
      return await AppDataSource.transaction(async (manager) => {
        const userRepository = new UserRepositoryImpl(manager);
        const user = await userRepository.findByUserNameWithCredential(
          userName
        );
        if (user == null || user.passwordDigest == null) return cb(null, false);

        const match = await compare(password, user.passwordDigest);

        if (match) {
          return cb(null, { userId: user.id });
        } else {
          return cb(null, null);
        }
      });
    }
  );

passport.use(localStrategy());

passport.serializeUser((user, done) => {
  done(null, (user as any).userId);
});

passport.deserializeUser(async (id, done) => {
  return await AppDataSource.transaction(async (manager) => {
    const userRepo = new UserRepositoryImpl(manager);
    const user = await userRepo.find(id as string);
    if (user == null) {
      done(null, false);
    } else {
      done(null, { userId: user.id });
    }
  });
});
