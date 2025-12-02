"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, FirestoreError } from "firebase/firestore";
import { db } from "@/lib/auth";

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  route_slug: string;
  status: 'active' | 'maintenance';
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    async function fetchAgents() {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, "system_agents"));
        const agentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Agent[];
        setAgents(agentsData);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError(err as FirestoreError);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  return { agents, loading, error };
}
