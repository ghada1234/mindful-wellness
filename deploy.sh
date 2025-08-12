#!/bin/bash

echo "🚀 Deploying Mindful Wellness App to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the mindful-wellness directory"
    exit 1
fi

# Build the app
echo "📦 Building the app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "🎉 Deployment complete!"
echo "📱 Your app should be live at the URL shown above"
echo "🔧 Don't forget to:"
echo "   1. Set up Firebase environment variables in Vercel dashboard"
echo "   2. Add your Vercel domain to Firebase authorized domains"
echo "   3. Update Firebase security rules"
