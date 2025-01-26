import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRE!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account: ", account);
      console.log("profile: ", profile);

      return true;
    },
  },
});
