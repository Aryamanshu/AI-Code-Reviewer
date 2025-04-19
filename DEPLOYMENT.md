# Deployment Guide

This document provides detailed instructions for deploying the Code Review AI application with the backend on Render and the frontend on Netlify.

## Prerequisites

- A GitHub account with your repository pushed
- A Google Gemini API key
- A Render account
- A Netlify account

## Backend Deployment (Render)

### 1. Create a Render Account

- Go to [render.com](https://render.com/) and sign up for an account
- Connect your GitHub account to Render

### 2. Create a New Web Service

- From your Render dashboard, click "New" and select "Web Service"
- Find and select your GitHub repository
- If you have a `render.yaml` file, Render will automatically detect it

### 3. Configure Your Web Service

- **Name**: code-review-backend (or your preferred name)
- **Environment**: Node
- **Region**: Choose the region closest to your users
- **Branch**: main (or your default branch)
- **Build Command**: `cd BackEnd && npm install`
- **Start Command**: `cd BackEnd && node server.js`

### 4. Set Environment Variables

Click on "Environment" and add the following variables:

- `NODE_ENV`: production
- `GOOGLE_GEMINI_KEY`: Your Google Gemini API key
- `CORS_ORIGIN`: * (temporarily, will update after Netlify deployment)

### 5. Select a Plan

- Choose the Free plan (or another plan if you need more resources)
- Click "Create Web Service"

### 6. Wait for Deployment

- Render will build and deploy your backend
- This may take a few minutes
- Once complete, note the URL provided (e.g., https://code-review-backend.onrender.com)

## Frontend Deployment (Netlify)

### 1. Create a Netlify Account

- Go to [netlify.com](https://netlify.com/) and sign up for an account
- Connect your GitHub account to Netlify

### 2. Create a New Site

- From your Netlify dashboard, click "Add new site" and select "Import an existing project"
- Select your GitHub repository

### 3. Configure Build Settings

- **Owner**: Your team or personal account
- **Branch to deploy**: main (or your default branch)
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

### 4. Set Environment Variables

Click on "Advanced build settings" and add:

- `VITE_API_URL`: Your Render backend URL (e.g., https://code-review-backend.onrender.com)

### 5. Deploy the Site

- Click "Deploy site"
- Wait for the build and deployment to complete
- Once finished, Netlify will provide a URL (e.g., https://your-app.netlify.app)

## Finalizing the Setup

### 1. Update CORS Settings on Render

- Go back to your Render dashboard
- Select your backend service
- Go to "Environment"
- Update the `CORS_ORIGIN` variable with your Netlify URL (e.g., https://your-app.netlify.app)
- Click "Save Changes"
- Your service will automatically redeploy with the new settings

### 2. Test Your Deployment

- Open your Netlify URL in a browser
- Try using the code review functionality
- Check the browser console for any errors
- Verify that the frontend can communicate with the backend

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Verify that the `CORS_ORIGIN` on Render matches your Netlify URL exactly
2. Make sure to include the protocol (https://) in the CORS_ORIGIN
3. Check if your Netlify URL has a trailing slash and match it in the CORS_ORIGIN

### API Connection Issues

If the frontend can't connect to the backend:

1. Check that the `VITE_API_URL` is set correctly in Netlify
2. Verify that your backend is running on Render
3. Try accessing the backend URL directly to ensure it's responding

### Build Failures

If your build fails:

1. Check the build logs for specific errors
2. Ensure all dependencies are properly listed in package.json
3. Verify that your build commands are correct

## Custom Domain (Optional)

### For Netlify:

1. Go to your Netlify site settings
2. Click on "Domain settings"
3. Click "Add custom domain"
4. Follow the instructions to set up your domain

### For Render:

1. Go to your Render web service
2. Click on "Settings"
3. Scroll to "Custom Domains"
4. Add your domain and follow the instructions

Remember to update the `CORS_ORIGIN` on Render if you switch to a custom domain.
