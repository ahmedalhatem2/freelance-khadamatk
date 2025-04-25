
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search, Bell } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

const Messages = () => {
  const { providerId } = useParams();
  const location = useLocation();
  const { serviceTitle, note } = location.state || {};

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <Card className="p-4 md:col-span-1 h-full overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">المحادثات</h2>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="pr-10 text-right"
                />
              </div>

              <Separator className="mb-4" />

              <div className="overflow-y-auto flex-grow">
                {/* Conversation list will go here */}
              </div>
            </div>
          </Card>

          {/* Main chat area */}
          <Card className="p-4 md:col-span-3 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold">{serviceTitle}</h3>
                <p className="text-sm text-muted-foreground">التفاوض على الخدمة</p>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="flex-grow overflow-y-auto mb-4 p-4">
              {note && (
                <Card className="p-4 mb-4 bg-muted">
                  <p className="text-sm">{note}</p>
                </Card>
              )}
              {/* Messages will go here */}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="اكتب رسالتك هنا..."
                className="text-right"
              />
              <Button size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
