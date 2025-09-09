import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Droplet, Activity } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
      <p className="text-gray-600">Here’s a quick overview of your activity.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Droplet className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Blood Requests</h2>
              <p className="text-gray-500">3 Active</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Donors Connected</h2>
              <p className="text-gray-500">15 Total</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Your Donations</h2>
              <p className="text-gray-500">2 Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
