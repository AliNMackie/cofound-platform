"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Client {
  id: string;
  name: string;
  ir35_status: 'outside' | 'inside';
  last_invoice_date: string; // ISO date string
  compliance_score: number;
}

export default function ClientList() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // async function fetchClients() {
      // if (!auth.currentUser) return;

      try {
        // Real fetch logic (commented out as per standard practice when no data exists)
        /*
        const partnerId = auth.currentUser.uid;
        const clientsRef = collection(db, `partners/${partnerId}/clients`);
        const snapshot = await getDocs(clientsRef);
        const clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Client[];
        setClients(clientsData);
        */

        // Mock data for display/development
        // await new Promise(resolve => setTimeout(resolve, 600));
        setClients([
          {
            id: 'c1',
            name: 'Acme Corp',
            ir35_status: 'outside',
            last_invoice_date: '2023-10-15',
            compliance_score: 98
          },
          {
            id: 'c2',
            name: 'Globex Inc',
            ir35_status: 'inside',
            last_invoice_date: '2023-10-01',
            compliance_score: 75
          },
          {
            id: 'c3',
            name: 'Soylent Corp',
            ir35_status: 'outside',
            last_invoice_date: '2023-10-20',
            compliance_score: 92
          }
        ]);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    // }

    // fetchClients();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>IR35 Status</TableHead>
              <TableHead>Last Invoice</TableHead>
              <TableHead>Compliance Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow 
                key={client.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/dashboard/client/${client.id}`)}
              >
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant={client.ir35_status === 'outside' ? "default" : "destructive"}
                    className={client.ir35_status === 'outside' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                  >
                    {client.ir35_status === 'outside' ? 'Outside IR35' : 'Inside IR35'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(client.last_invoice_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={client.compliance_score < 80 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>
                      {client.compliance_score}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
