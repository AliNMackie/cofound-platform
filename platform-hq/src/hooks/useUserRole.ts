"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { onAuthStateChanged } from "firebase/auth";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          // Assuming the custom claim is named 'role'
          setRole((idTokenResult.claims.role as string) || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole("user"); // Default to user on error
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { role, loading };
}
