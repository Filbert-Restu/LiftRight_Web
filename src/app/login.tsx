import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../sync/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  // Validasi format email sederhana
  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(inputEmail) || (!inputEmail.endsWith('@gmail.com') && !inputEmail.includes('@'))) {
      setEmailError('Please use a valid email format (e.g., name@gmail.com)');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validasi ketentuan password
  const validatePassword = (inputPassword: string) => {
    if (!inputPassword) {
      setPasswordError('Password is required');
      return false;
    } else if (inputPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignIn = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Sign In Failed', error.message);
    } else if (data.user) {
      useAuthStore.getState().setUser(data.user);
      router.replace('/(tabs)/connect');
    }
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert('Success', 'Account created successfully! Please sign in or check your email for confirmation.');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-surface">
      <View className="bg-white/80 p-6 rounded-xl border border-[#AAC7D8]/30">
        <Text className="text-2xl font-bold text-primary mb-2 text-center">LiftRight Auth</Text>
        <Text className="text-sm text-on-surface-variant mb-6 text-center">Sign in to sync your workout data</Text>

        <Text className="text-xs font-semibold uppercase tracking-[0.05em] text-on-surface-variant mb-1">Email</Text>
        <TextInput
          className={`bg-surface-container-low p-3 rounded-lg mb-1 border ${emailError ? 'border-red-500' : 'border-outline-variant'}`}
          placeholder="name@gmail.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError ? <Text className="text-red-500 text-xs mb-3">{emailError}</Text> : <View className="mb-3" />}

        <Text className="text-xs font-semibold uppercase tracking-[0.05em] text-on-surface-variant mb-1">Password</Text>
        <TextInput
          className={`bg-surface-container-low p-3 rounded-lg mb-1 border ${passwordError ? 'border-red-500' : 'border-outline-variant'}`}
          placeholder="••••••••"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) validatePassword(text);
          }}
          secureTextEntry
        />
        <Text className="text-xs text-gray-500 mb-1">Must be at least 6 characters</Text>
        {passwordError ? <Text className="text-red-500 text-xs mb-6">{passwordError}</Text> : <View className="mb-5" />}

        {loading ? (
          <ActivityIndicator size="small" color="#2d4055" />
        ) : (
          <View className="space-y-3">
            <TouchableOpacity 
              className="bg-primary p-3 rounded-lg items-center mb-3"
              onPress={handleSignIn}
            >
              <Text className="text-on-primary font-semibold">Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-secondary-container p-3 rounded-lg items-center"
              onPress={handleSignUp}
            >
              <Text className="text-on-secondary-container font-semibold">Create New Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}