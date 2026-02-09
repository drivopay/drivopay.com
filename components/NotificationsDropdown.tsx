"use client"

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, DollarSign, Gift, TrendingUp, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  type: 'payment' | 'bonus' | 'achievement' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received ₹245 from a customer',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'bonus',
      title: 'Weekly Bonus Unlocked!',
      message: 'Complete 5 more rides to earn ₹500 bonus',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You completed 50 rides this week!',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Peak Hours Alert',
      message: 'High demand expected from 6-9 PM today',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'bonus':
        return <Gift className="w-5 h-5 text-purple-600" />;
      case 'achievement':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100';
      case 'bonus':
        return 'bg-purple-100';
      case 'achievement':
        return 'bg-blue-100';
      case 'alert':
        return 'bg-orange-100';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors outline-none">
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-4 py-3">
          <DropdownMenuLabel className="text-lg font-bold p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`px-4 py-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex gap-3 w-full">
                  <div className={`w-10 h-10 rounded-lg ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />
        <div className="p-2">
          <button className="w-full text-center py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
            View All Notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
