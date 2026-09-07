import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useColors } from '../hooks/use-color-scheme';

interface DrawerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { icon: '▦', label: 'Dashboard', route: '/dashboard', hasIndicator: true },
    { icon: '👤', label: 'My profile', route: '/profile' },
    { icon: '➕', label: 'Add well-wisher', route: '/add-well-wisher' },
    { icon: '👥', label: 'My well-wishers', route: '/my-well-wishers' },
    { icon: '∼', label: 'Emergency history', route: '/emergency-history' },
    { icon: '🔔', label: 'Notifications', route: '/notifications' },
    { icon: '⚙', label: 'Settings', route: '/settings' },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const colors = useColors();
    const { user, logout } = useAuth();
    const { width, height } = useWindowDimensions();
    const slideAnim = useRef(new Animated.Value(width)).current;

    const drawerWidth = width * 0.75;

    //   useEffect(() => {
    //     if (isOpen) {
    //       Animated.timing(slideAnim, {
    //         toValue: width - drawerWidth,
    //         duration: 300,
    //         useNativeDriver: false,
    //       }).start();
    //     } else {
    //       Animated.timing(slideAnim, {
    //         toValue: width,
    //         duration: 300,
    //         useNativeDriver: false,
    //       }).start();
    //     }
    //   }, [isOpen, slideAnim, width, drawerWidth]);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? 0 : drawerWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen, drawerWidth, slideAnim]);

    const handleNavigation = (route: string) => {
        router.push(route as any);
        onClose();
    };

    const handleLogout = () => {
        logout();
        onClose();
        router.replace('/');
    };

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View className="flex-1 flex-row">
                {/* Backdrop */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onClose}
                    className="flex-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                />

                {/* Drawer */}
                <Animated.View style={[ styles.drawer, {  width: drawerWidth, transform: [{ translateX: slideAnim }], }, ]} >
                    {/* <Animated.View style={{ transform: [{ translateX: slideAnim }], width: drawerWidth, height: height }}> */}
          <SafeAreaView
            style={{ backgroundColor: colors.card, width: drawerWidth, height: height }}
            className="flex-1"
          >
                    <View
                        className="flex-1 flex-col"
                        style={{ backgroundColor: colors.card, width: drawerWidth, height: height }}
                    >
                        {/* Top Header with Close Button */}
                        <View className="flex-row items-center justify-between px-6 py-4 border-b" style={{ borderColor: colors.border }}>
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                                    <Text className="text-2xl">🚑</Text>
                                </View>
                                <View className="flex-1">
                                    <Text style={{ color: colors.foreground }} className="text-sm font-bold">
                                        EMERGENCY INTENSIVE CARE
                                    </Text>
                                    <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                                        WE TRULY CARE FOR YOU
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} className="p-2">
                                <Text className="text-2xl" style={{ color: colors.foreground }}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            className="flex-1"
                        >
                            {/* Care Message Section */}
                            <View className="px-6 py-8 border-b" style={{ borderColor: colors.border }}>
                                <Text style={{ color: colors.foreground }} className="text-3xl font-bold mb-2">
                                    Your care, close by.
                                </Text>
                                <Text style={{ color: colors.mutedForeground }} className="text-base">
                                    Everything you need, in one place.
                                </Text>
                            </View>

                            {/* Menu Items */}
                            <View className="px-6 py-6">
                                {menuItems.map((item, index) => (
                                    <TouchableOpacity
                                        key={item.route}
                                        onPress={() => handleNavigation(item.route)}
                                        className="flex-row items-center py-4"
                                        style={{
                                            borderBottomWidth: index === menuItems.length - 1 ? 0 : 1,
                                            borderBottomColor: colors.border,
                                        }}
                                    >
                                        <Text className="text-2xl mr-6 w-6 text-center">{item.icon}</Text>
                                        <Text style={{ color: colors.foreground }} className="font-medium flex-1 text-base">
                                            {item.label}
                                        </Text>
                                        {item.hasIndicator && (
                                            <View
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: colors.primary }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Spacer */}
                            <View className="flex-1" />

                            {/* Divider */}
                            <View style={{ backgroundColor: colors.border, height: 1 }} />

                            {/* Logout */}
                            <View className="px-6 py-6">
                                <TouchableOpacity
                                    onPress={handleLogout}
                                    className="flex-row items-center py-3"
                                >
                                    <Text className="text-2xl mr-6 w-6 text-center" style={{ color: '#c41e3a' }}>
                                        📁
                                    </Text>
                                    <Text style={{ color: '#c41e3a' }} className="font-medium flex-1 text-base">
                                        Log out
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View className="px-6 py-6 border-t" style={{ borderColor: colors.border }}>
                                <Text
                                    style={{ color: colors.mutedForeground }}
                                    className="text-center text-sm font-medium"
                                >
                                    Made in India ❤️
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});