import loginUser from "@/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Phone",
          type: "text",
          placeholder: "email or phone",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { identifier, password } = credentials;

        const bdPhonePattern = /^01[3-9][0-9]{8}$/;
        const method = bdPhonePattern.test(identifier) ? "phone" : "email";
        const user = await loginUser({
          method: method,
          password: password,
          [method]: identifier,
        });
        if (!user) {
          return null;
        } else {
          return user;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        (token._id = user._id),
          (token.name = user.name),
          (token.method = user.method),
          (token.role = user.role);
      }
      return token;
    },
    async session({ token, session }) {
      (session._id = token._id),
        (session.name = token.name),
        (session.method = token.method),
        (session.role = token.role);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
