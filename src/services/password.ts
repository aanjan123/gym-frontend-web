export const getPasswordStrength = (password: string) => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('length');
  if (!/[A-Z]/.test(password)) errors.push('uppercase');
  if (!/[a-z]/.test(password)) errors.push('lowercase');
  if (!/[0-9]/.test(password)) errors.push('number');
  if (!/[!@#$%^&*]/.test(password)) errors.push('special');

  const score = 5 - errors.length;
  if (score === 5) return { strength: 'Strong', color: '#10b981', width: '100%' };
  if (score === 4) return { strength: 'Good', color: '#22c55e', width: '80%' };
  if (score === 3) return { strength: 'Fair', color: '#f59e0b', width: '60%' };
  if (score === 2) return { strength: 'Weak', color: '#fb923c', width: '40%' };
  return { strength: 'Very Weak', color: '#ef4444', width: '20%' };
};
