# Upload Sample Data to Sanity Studio

This guide will help you populate your Sanity Studio with sample data so you can see how your website looks with real content.

## Step 1: Get Your Sanity API Token

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Sign in to your account
3. Select your project: **Digital Studio** (Project ID: ryc5e4q2)
4. Navigate to **API** → **Tokens** in the left sidebar
5. Click **Add API Token**
6. Give it a name like "Development Token"
7. Set permissions to **Editor** (this allows read and write access)
8. Click **Save**
9. **IMPORTANT:** Copy the token immediately - you won't be able to see it again!

## Step 2: Add the Token to Your Environment File

1. Open the `.env.local` file in the root of your project
2. Replace `your_token_here` with your actual token:
   ```
   SANITY_API_TOKEN=sk_your_actual_token_here
   ```
3. Save the file

## Step 3: Install Dependencies

Open a terminal in your project root and run:

```bash
npm install
```

This will install the `dotenv` package needed to load environment variables.

## Step 4: Run the Upload Script

In your terminal, run:

```bash
npm run upload-data
```

The script will:
- Upload 4 services (Brand Identity, Web Design, UI/UX, Digital Marketing)
- Upload 4 projects with case studies and results
- Upload 4 testimonials from happy clients
- Upload 3 blog posts about design and development
- Link all the data together (projects to testimonials, services to projects, etc.)

## Step 5: View Your Data in Sanity Studio

1. Start your Sanity Studio:
   ```bash
   cd sanity-studio
   npm run dev
   ```

2. Open your browser to [http://localhost:3333](http://localhost:3333)

3. You should now see all the sample data in your Studio!

## Step 6: View Your Website

1. In a new terminal, go back to your project root and start Next.js:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Your website should now display the sample content!

## What Data Was Added?

### Services (4 total)
- Brand Identity Design
- Web Design & Development
- UI/UX Design
- Digital Marketing

Each service includes:
- Description and features
- Process steps
- Call-to-action
- Links to related projects

### Projects (4 total)
- TechStart Brand Transformation
- GreenLeaf E-Commerce Platform
- Fitness Plus Mobile App
- Urban Threads Fashion Marketplace

Each project includes:
- Client name and details
- Case study with challenges and solutions
- Results and metrics
- Links to testimonials and services

### Testimonials (4 total)
- From Sarah Johnson (TechStart Inc.)
- From Michael Chen (GreenLeaf Organics)
- From Emily Rodriguez (Fitness Plus)
- From David Thompson (Urban Threads)

Each testimonial includes:
- Client name, company, and role
- Quote
- 5-star rating
- Link to related project

### Blog Posts (3 total)
- The Future of Web Design: Trends to Watch in 2024
- Building Better User Experiences: A Guide to UX Research
- From Idea to Launch: Our Website Development Process

Each post includes:
- Full content with headings
- Categories and tags
- Publication date
- Excerpt

## Modifying the Data

Now that you have sample data in Sanity Studio, you can:

1. Edit any content directly in the Studio
2. Add your own images (the sample data doesn't include images yet)
3. Add more projects, services, or blog posts
4. Customize descriptions and content to match your brand

## Adding Images

To make your website look complete, you'll want to add images:

1. In Sanity Studio, open any document (project, service, etc.)
2. Click on the image field
3. Upload your own images or use placeholder images
4. Save the document

Recommended image sizes:
- Project featured images: 1200x800px
- Service icons: 100x100px
- Testimonial photos: 200x200px
- Blog post featured images: 1200x630px

## Need Help?

If you encounter any errors:

1. Make sure your `.env.local` file has the correct API token
2. Ensure you're running the commands from the correct directory
3. Check that both your Sanity Studio and Next.js app are using the same project ID
4. Verify your Sanity token has "Editor" permissions

## Cleaning Up

If you want to remove all sample data and start fresh:

1. Go to your Sanity Studio
2. Select all documents you want to delete
3. Use the bulk delete option
4. Or run the upload script again to add fresh data

Enjoy exploring your website with real content! 🎉
