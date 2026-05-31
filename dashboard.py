#!/usr/bin/env python3
"""
Academic Research Dashboard - FastHTML Version
A lightweight, fast, and free Python-based dashboard for A Masrur Ahmed's research profile.
Built with FastHTML (https://fastht.ml) - ultra-lightweight Python web framework.
"""

import json
from pathlib import Path
from fasthtml.common import *

# Load profile data
profile_path = Path(__file__).parent / "src" / "data" / "profile.json"
with open(profile_path, 'r') as f:
    profile = json.load(f)

# Create FastHTML app
app, rt = fast_app(
    title=f"{profile['personal']['name']} - Research Dashboard",
    hdrs=[
        Style("""
            :root {
                --primary: #0ea5e9;
                --secondary: #8b5cf6;
                --accent: #10b981;
                --dark: #0f172a;
                --light: #f8fafc;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: var(--light);
                color: var(--dark);
                line-height: 1.6;
            }
            .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
            .hero { 
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                padding: 4rem 2rem;
                text-align: center;
                border-radius: 1rem;
                margin-bottom: 2rem;
            }
            .hero h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
            .hero p { font-size: 1.2rem; opacity: 0.9; }
            .metrics { 
                display: flex; 
                justify-content: center; 
                gap: 2rem; 
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            .metric-card {
                background: rgba(255,255,255,0.2);
                padding: 1.5rem 2rem;
                border-radius: 0.5rem;
                backdrop-filter: blur(10px);
                min-width: 150px;
            }
            .metric-value { font-size: 2.5rem; font-weight: bold; }
            .metric-label { font-size: 0.9rem; opacity: 0.9; }
            .section { 
                background: white; 
                padding: 2rem; 
                border-radius: 1rem; 
                margin-bottom: 2rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .section h2 { 
                color: var(--primary); 
                margin-bottom: 1.5rem;
                font-size: 1.8rem;
                border-bottom: 3px solid var(--primary);
                padding-bottom: 0.5rem;
                display: inline-block;
            }
            .grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                gap: 1.5rem;
            }
            .card {
                background: var(--light);
                padding: 1.5rem;
                border-radius: 0.5rem;
                border-left: 4px solid var(--primary);
                transition: transform 0.2s;
            }
            .card:hover { transform: translateY(-3px); }
            .card h3 { color: var(--dark); margin-bottom: 0.5rem; }
            .card .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
            .card p { color: #475569; }
            .tag {
                display: inline-block;
                background: var(--primary);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.8rem;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .pub-item {
                padding: 1rem;
                border-bottom: 1px solid #e2e8f0;
            }
            .pub-item:last-child { border-bottom: none; }
            .pub-title { font-weight: 600; color: var(--dark); margin-bottom: 0.5rem; }
            .pub-authors { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
            .pub-journal { color: var(--primary); font-style: italic; }
            .pub-citations { 
                background: var(--accent); 
                color: white; 
                padding: 0.2rem 0.6rem; 
                border-radius: 9999px; 
                font-size: 0.8rem;
                margin-left: 0.5rem;
            }
            .contact-info { 
                display: flex; 
                gap: 2rem; 
                flex-wrap: wrap;
                margin-top: 1rem;
            }
            .contact-item { 
                display: flex; 
                align-items: center; 
                gap: 0.5rem;
            }
            nav {
                background: var(--dark);
                padding: 1rem 0;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            nav ul {
                display: flex;
                justify-content: center;
                gap: 2rem;
                list-style: none;
                flex-wrap: wrap;
            }
            nav a {
                color: white;
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                transition: background 0.2s;
            }
            nav a:hover { background: var(--primary); }
            footer {
                background: var(--dark);
                color: white;
                text-align: center;
                padding: 2rem;
                margin-top: 3rem;
            }
            @media (max-width: 768px) {
                .hero h1 { font-size: 2rem; }
                .metrics { gap: 1rem; }
                .metric-card { min-width: 120px; padding: 1rem; }
                .metric-value { font-size: 2rem; }
                nav ul { gap: 1rem; }
                .contact-info { flex-direction: column; gap: 1rem; }
            }
        """)
    ]
)

def create_nav():
    """Create navigation menu"""
    return Nav(
        Ul(
            Li(A("Home", href="#")),
            Li(A("Research", href="#research")),
            Li(A("Publications", href="#publications")),
            Li(A("Experience", href="#experience")),
            Li(A("Education", href="#education")),
            Li(A("Skills", href="#skills")),
            Li(A("Contact", href="#contact")),
        )
    )

def create_hero():
    """Create hero section with metrics"""
    metrics = profile['research']['metrics']
    return Div(
        H1(profile['personal']['name']),
        P(f"{profile['personal']['title']} | {profile['personal']['tagline']}"),
        Div(
            Div(
                Span(str(metrics['citations']), cls="metric-value"),
                Span("Citations", cls="metric-label"),
                cls="metric-card"
            ),
            Div(
                Span(str(metrics['hIndex']), cls="metric-value"),
                Span("h-index", cls="metric-label"),
                cls="metric-card"
            ),
            Div(
                Span(str(metrics['i10Index']), cls="metric-value"),
                Span("i10-index", cls="metric-label"),
                cls="metric-card"
            ),
            cls="metrics"
        ),
        cls="hero"
    )

def create_research_areas():
    """Create research areas section"""
    areas = profile['researchAreas']
    cards = [
        Div(
            H3(area),
            cls="card"
        ) for area in areas
    ]
    return Div(
        H2("Research Areas"),
        Div(*cards, cls="grid"),
        cls="section"
    )

def create_publications():
    """Create publications section"""
    pubs = profile['publications'][:20]  # Show first 20
    pub_items = []
    for pub in pubs:
        citations_span = Span(f"{pub['citations']} citations", cls="pub-citations") if pub.get('citations', 0) > 0 else None
        pub_items.append(
            Div(
                Div(cls="pub-title", children=[Span(pub['title'])] + ([citations_span] if citations_span else [])),
                Div(cls="pub-authors", children=pub['authors']),
                Div(cls="pub-journal", children=f"{pub['journal']}, {pub['year']}"),
                cls="pub-item"
            )
        )
    
    return Div(
        H2("Recent Publications"),
        P(f"Total Publications: {len(profile['publications'])}"),
        Div(*pub_items),
        cls="section",
        id="publications"
    )

def create_experience():
    """Create experience section"""
    exp_items = []
    for exp in profile['experience'][:8]:  # Show most recent 8
        highlights = []
        if exp.get('highlights'):
            highlights = [Li(h) for h in exp['highlights'][:3]]  # Show first 3 highlights
        
        exp_items.append(
            Div(
                H3(exp['title']),
                P(f"{exp['organization']} | {exp['location']}"),
                P(f"{exp['period']} ({exp['duration']})"),
                P(exp['description']),
                Ul(*highlights) if highlights else None,
                cls="card"
            )
        )
    
    return Div(
        H2("Professional Experience"),
        Div(*exp_items, cls="grid"),
        cls="section",
        id="experience"
    )

def create_education():
    """Create education section"""
    edu_items = []
    for edu in profile['education']:
        edu_items.append(
            Div(
                H3(edu['degree']),
                P(f"{edu['institution']}"),
                P(f"{edu['period']}"),
                P(f"Thesis: {edu['thesis']}") if edu.get('thesis') else None,
                cls="card"
            )
        )
    
    return Div(
        H2("Education"),
        Div(*edu_items, cls="grid"),
        cls="section",
        id="education"
    )

def create_skills():
    """Create skills section"""
    skills = profile['skills']
    skill_sections = []
    
    for category, items in skills.items():
        tags = [Span(item, cls="tag") for item in items]
        skill_sections.append(
            Div(
                H4(category.title()),
                Div(*tags),
                style="margin-bottom: 1.5rem;"
            )
        )
    
    return Div(
        H2("Skills & Expertise"),
        Div(*skill_sections),
        cls="section",
        id="skills"
    )

def create_contact():
    """Create contact section"""
    contact = profile['personal']['contact']
    return Div(
        H2("Contact Information"),
        Div(
            Div(f"📱 {contact['phone']}", cls="contact-item"),
            Div(f"✉️ {contact['email']}", cls="contact-item"),
            Div(f"💼 {contact['workEmail']}", cls="contact-item"),
            Div(f"🔗 {contact['linkedin']}", cls="contact-item"),
            cls="contact-info"
        ),
        Div(
            P(f"ORCID: {profile['research']['orcid']}"),
            P(f"Google Scholar: {profile['research']['googleScholar']}"),
            style="margin-top: 1.5rem;"
        ),
        cls="section",
        id="contact"
    )

@rt("/")
def get():
    """Main page route"""
    return Titled(
        f"{profile['personal']['name']} - Research Dashboard",
        create_nav(),
        Div(
            create_hero(),
            create_research_areas(),
            create_publications(),
            create_experience(),
            create_education(),
            create_skills(),
            create_contact(),
            cls="container"
        ),
        Footer(
            P(f"© 2025 {profile['personal']['name']}. Built with FastHTML."),
            cls="footer"
        )
    )

if __name__ == "__main__":
    serve()
