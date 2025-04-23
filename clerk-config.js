// Clerk configuration
const CLERK_CONFIG = {
    publishableKey: 'YOUR_CLERK_PUBLISHABLE_KEY', // Replace with your Clerk publishable key
    appearance: {
        theme: 'light',
        variables: {
            colorPrimary: '#ef4444', // Red-500 to match your theme
            colorText: '#1f2937', // Gray-800
            colorBackground: '#ffffff',
            colorInputBackground: '#f3f4f6', // Gray-100
            colorInputText: '#1f2937', // Gray-800
            borderRadius: '0.5rem', // Rounded-lg
        },
        elements: {
            formButtonPrimary: {
                backgroundColor: '#ef4444', // Red-500
                '&:hover': {
                    backgroundColor: '#dc2626', // Red-600
                },
            },
        },
    },
};

export default CLERK_CONFIG; 