# Bradley Kennedy Personal Website

Bradley Kennedy's personal website is a Jekyll-based GitHub Pages site using the Beautiful Jekyll theme. The site showcases his academic work, research, teaching experience, and various web applications for the psychology and academic communities.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, build, and test the repository:
- Install Ruby dependencies: `gem install bundler --user-install`
- Add gem executables to PATH: `export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"`
- Configure bundle for local installation: `bundle config set --local path vendor/bundle`
- Install Jekyll and dependencies: `bundle install` -- takes 30 seconds to 2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
- Build the site: `bundle exec jekyll build` -- takes 3 seconds. Set timeout to 30+ seconds.
- Check site generation worked: `ls -la _site/` should show generated HTML files

### Run the development server:
- ALWAYS run the bootstrapping steps first.
- Development server: `bundle exec jekyll serve --host 0.0.0.0 --port 4000` -- starts in 2 seconds. Set timeout to 30+ seconds.
- With drafts: `bundle exec jekyll serve --drafts --host 0.0.0.0 --port 4000`
- Access the site at: http://localhost:4000
- Server will auto-rebuild on file changes

### Build with different options:
- Build with drafts: `bundle exec jekyll build --drafts` -- takes 3 seconds. Set timeout to 30+ seconds.
- Clean build artifacts: `bundle exec jekyll clean`

## Validation

- ALWAYS manually validate any changes by building the site and serving it locally
- ALWAYS test the homepage loads correctly at http://localhost:4000 
- Test navigation menu functionality (Home, Academia dropdowns, Other dropdown, Contact)
- Verify blog posts display correctly at http://localhost:4000/blog
- Check that apps page displays the YAML data from `_data/apps.yml` correctly
- The site should load without JavaScript errors (some CDN resources may be blocked, this is expected)
- NEVER CANCEL build or serve commands - they complete quickly but need proper timeouts

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository Structure
```
.
├── README.md                 # Basic Jekyll serve instruction
├── Gemfile                   # Ruby dependencies (github-pages, webrick)
├── Gemfile.lock             # Locked dependency versions
├── _config.yml              # Jekyll configuration with Beautiful Jekyll theme
├── _posts/                  # Blog posts (Markdown files with YAML frontmatter)
├── _data/                   # YAML data files (apps.yml, projects.yml)
├── _includes/               # Reusable HTML snippets
├── _layouts/                # Custom layout templates
├── _archive/                # Archived content
├── _site/                   # Generated static site (excluded from git)
├── assets/                  # CSS, JS, images
├── apps/                    # Application showcase pages
├── blog/                    # Blog index and related pages
├── emails/                  # Email template pages
├── CookieBar/               # Cookie consent functionality
├── fontawesome470/          # FontAwesome icons
└── [various .md files]      # Individual pages (contact, research, etc.)
```

### Key Configuration Details
- **Theme**: Uses `daattali/beautiful-jekyll` remote theme
- **Plugins**: jekyll-paginate, jekyll-sitemap, jemoji, jekyll-redirect-from
- **URL Structure**: Blog posts use `/blog/:title/` permalinks
- **Pagination**: 5 posts per page
- **Timezone**: Europe/London
- **Markdown**: Kramdown with GFM input
- **Excludes**: vendor/, .bundle/, README.md, LICENSE, etc.

### Common File Types and Purposes
- **`.md` files in root**: Individual pages (about, contact, research, teaching, etc.)
- **`_posts/*.md`**: Blog posts with date-based naming (YYYY-MM-DD-title.md)
- **`_data/apps.yml`**: Data for the applications showcase page
- **`_includes/*.html`**: Reusable components (navigation, footer elements, etc.)
- **`assets/`**: Stylesheets, JavaScript, images, and other static resources

### Dependencies and Versions
- **Ruby**: 3.2.3+ (system Ruby works)
- **Jekyll**: 3.9.5 (via github-pages gem)
- **github-pages**: 231 (ensures GitHub Pages compatibility)
- **webrick**: 1.7+ (required for local development server)

### Build Timing Expectations
- `bundle install`: 30 seconds - 2 minutes (first time), 5-10 seconds (subsequent)
- `bundle exec jekyll build`: ~3 seconds
- `bundle exec jekyll serve`: ~2 seconds to start
- Site generation: ~1.3 seconds for full rebuild

## Troubleshooting

### Common Issues
- **Missing webrick**: If `jekyll serve` fails with "cannot load such file -- webrick", ensure `webrick` gem is in Gemfile
- **Permission errors during bundle install**: Use `gem install bundler --user-install` and update PATH
- **Build fails with vendor/ errors**: Ensure `vendor/bundle` is in both `.gitignore` and `_config.yml` exclude list
- **Deprecation warnings**: The "DidYouMean::SPELL_CHECKERS" warnings are cosmetic and don't affect functionality

### Validation Commands That Don't Work
- `jekyll doctor` -- fails due to missing URL configuration, not critical
- Jekyll has no built-in linting beyond basic syntax checking during build

### Site Features to Test
1. **Homepage**: Displays personal information, academic credentials, and dynamic typing effect
2. **Navigation**: Multi-level dropdown menus work correctly
3. **Blog**: Post listings, pagination, and individual post pages
4. **Apps Page**: Dynamic listing from YAML data with filtering
5. **Contact Forms**: Various contact and feedback forms throughout the site
6. **Academic Content**: CV links, research publications, teaching materials

## Development Workflow

1. Make changes to content (Markdown files) or layouts
2. Run `bundle exec jekyll build` to test for build errors -- NEVER CANCEL, set 30+ second timeout
3. Run `bundle exec jekyll serve` to test locally -- NEVER CANCEL, set 30+ second timeout  
4. Navigate to http://localhost:4000 and manually test changes
5. Check browser console for any JavaScript errors
6. Verify responsive design works on different screen sizes
7. Test key user journeys (homepage → blog → individual posts, navigation menus)
8. Commit changes when validation is complete

Always ensure the site builds successfully and displays correctly before making commits.