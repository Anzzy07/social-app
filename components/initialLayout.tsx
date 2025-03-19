import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const segments = useSegments(); //Gives segments of current screens

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthPage = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthPage) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthPage) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
