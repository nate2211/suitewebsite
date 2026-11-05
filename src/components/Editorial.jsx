import React from "react";
import { Link, useLocation } from "react-router-dom";
import HelmetHeader from "./HelmetHeader.jsx";
import { CONTACT_EMAIL, INFORMATION_PAGES, getToolGuide } from "../content/routeGuides.js";
import { getSeoRoute } from "../seo/routeMetadata.js";
import "./Editorial.css";

const links = [
  ["Office tools", "/office-tools"],
  ["Learning guides", "/guides/file-conversion-checklist"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];

function RelatedLinks({ paths = [] }) {
  return paths.length ? <nav className="site-guidance__related" aria-label="Related pages">
    {paths.map((path) => {
      const item = INFORMATION_PAGES[path] || getSeoRoute(path);
      return <Link key={path} to={path}>{item?.title || path}</Link>;
    })}
  </nav> : null;
}

export function EditorialPage() {
  const { pathname } = useLocation();
  const content = INFORMATION_PAGES[pathname];
  if (!content) return null;
  return <main className="site-editorial">
    <HelmetHeader title={content.title} path={pathname} description={content.description}/>
    <nav className="site-editorial__top" aria-label="Main navigation">
      <Link to="/" className="site-editorial__brand">SuiteOfficeLab</Link>
      <Link to="/office-tools">Office tools</Link>
      <Link to="/guides/csv-data-quality">Guides</Link>
    </nav>
    <article className="site-editorial__article">
      <p className="site-guidance__eyebrow">{pathname.startsWith('/guides/') ? 'SuiteOfficeLab learning guide' : 'SuiteOfficeLab information'}</p>
      <h1>{content.title}</h1>
      <p className="site-editorial__lead">{content.description}</p>
      {content.sections.map(([heading, copy]) => <section key={heading}>
        <h2>{heading}</h2>
        <p>{copy}</p>
      </section>)}
      {pathname === '/contact' ? <p><strong>Email: </strong><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p> : null}
      <h2>Related resources</h2>
      <RelatedLinks paths={content.links}/>
    </article>
  </main>;
}

export function SiteResourceFooter() {
  const { pathname } = useLocation();
  const guide = getToolGuide(pathname);
  const isInfoPage = !!INFORMATION_PAGES[pathname];
  const current = getSeoRoute(pathname);
  const showGuide = !isInfoPage && !!guide && current?.index !== false;
  return <>
    {showGuide ? <aside className="site-guidance" aria-label={`How to use ${current.h1}`}>
      <div className="site-guidance__inner">
        <p className="site-guidance__eyebrow">Helpful instructions and limitations</p>
        <h2>{current.h1}: practical guide</h2>
        <p>{guide.intro}</p>
        <div className="site-guidance__grid">
          <section>
            <h3>Using this tool</h3>
            <ol>{guide.steps.map(step=><li key={step}>{step}</li>)}</ol>
          </section>
          <section>
            <h3>Example workflow</h3>
            <p>{guide.example}</p>
            <h3>Before you rely on an export</h3>
            <ul>{guide.cautions.map(note=><li key={note}>{note}</li>)}</ul>
          </section>
        </div>
        <h3>Learn more about file workflows</h3>
        <RelatedLinks paths={['/guides/file-conversion-checklist', '/guides/csv-data-quality', '/guides/pdf-redaction-and-signing', '/guides/word-pdf-conversion', '/guides/video-compression-basics']}/>
      </div>
    </aside> : null}
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link to="/" className="site-footer__brand">SuiteOfficeLab</Link>
          <p>Browser utilities for everyday document and file workflows. Review downloaded files before using them for important purposes.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label="Footer navigation">{links.map(([name,path])=><Link to={path} key={path}>{name}</Link>)}</nav>
      </div>
    </footer>
  </>;
}
