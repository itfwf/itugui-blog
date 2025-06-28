import sys
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
from collections import deque
import os
import subprocess
import datetime
from xml.dom import minidom 


def format_git_date(git_date_str):
    try:
        dt = datetime.strptime(git_date_str, "%Y-%m-%d %H:%M:%S")
        dt = dt.replace(tzinfo=timezone.utc)  # Assume UTC if git doesn't provide TZ
        return dt.isoformat()  # Outputs: 2025-06-07T17:03:00+00:00
    except Exception:
        # Fall back to now if parsing fails
        return datetime.now(timezone.utc).isoformat()


def get_last_git_commit_date(file_path, web_root_dir):
    """
    Retrieves the last commit date of a file from Git history.

    Args:
        file_path (str): The relative path to the file within the web_root_dir.
        web_root_dir (str): The absolute path to the root directory of your web application.

    Returns:
        str: The last commit date in 'YYYY-MM-DD' format, or None if not found/error.
    """
    full_file_path = os.path.join(web_root_dir, "app", file_path.lstrip("/\\"))
    if not os.path.exists(full_file_path):
        print(
            f"Warning: Local file not found for path: {full_file_path}"
        )  # Uncomment for verbose file warnings
        return datetime.now(timezone.utc).isoformat()

    try:
        # Use subprocess to run the git log command
        # -1: Limit to one commit
        # --format="%cd": Show commit date
        # --date=format:"%Y-%m-%d": Format date as YYYY-MM-DD
        git_command = [
            "git",
            "log",
            "-1",
            "--format=%cd",
            "--date=format:%Y-%m-%d %H:%M",
            full_file_path,
        ]
        result = subprocess.run(
            git_command, capture_output=True, text=True, check=True, cwd=web_root_dir
        )

        return format_git_date(result.stdout.strip())

    except subprocess.CalledProcessError as e:
        print(f"Error executing git command for {full_file_path}: {e}")
        print(f"Stderr: {e.stderr.strip()}")
        return datetime.now(timezone.utc).isoformat()
    except Exception as e:
        print(
            f"An unexpected error occurred while getting git date for {full_file_path}: {e}"
        )
        return datetime.now(timezone.utc).isoformat()


def generate_sitemap(base_url, web_root_dir):
    """
    Crawls the website at the base_url and generates a sitemap.xml file,
    including <lastmod> from Git history.

    Args:
        base_url (str): The base URL of the website to crawl (e.g., 'http://localhost:3000').
        web_root_dir (str): The absolute path to the root directory of your web application
                            where your HTML files reside (e.g., 'C:/Users/YourUser/my-app/public').
    """
    if not base_url.endswith("/"):
        base_url += "/"

    visited_urls = set()
    urls_to_visit = deque([base_url])
    internal_urls_with_files = []

    print(f"Starting to crawl: {base_url}")
    print(f"Assuming web root directory for Git history: {web_root_dir}")

    base_netloc = urlparse(base_url).netloc

    base_url_path_parsed = urlparse(base_url).path.rstrip("/")

    while urls_to_visit:
        current_url = urls_to_visit.popleft()

        if current_url in visited_urls:
            continue

        print(f"\nVisiting: {current_url}")
        visited_urls.add(current_url)

        parsed_current_url = urlparse(current_url)

        relative_path_from_base = parsed_current_url.path.replace(
            base_url_path_parsed, "", 1
        ).lstrip("/")

        if not relative_path_from_base or relative_path_from_base == "/":
            local_file_path = "index.html"  # Assuming root URL maps to index.html
        elif relative_path_from_base.endswith("/"):
            local_file_path = os.path.join(relative_path_from_base, "index.html")
        elif "." not in os.path.basename(
            relative_path_from_base
        ):  # If no file extension, assume .html
            local_file_path = relative_path_from_base + ".html"
        else:
            local_file_path = relative_path_from_base

        local_file_path = local_file_path.replace("/", os.sep)

        internal_urls_with_files.append((current_url, local_file_path))

        try:
            response = requests.get(current_url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, "html.parser")
            allLinks = [
                link["href"]
                for link in soup.find_all("a", href=True)
                if base_netloc in link["href"]
            ]

            print(f"all link found {allLinks}")
            for link in allLinks:
                href = link["href"]
                print(f"  Found link href: {href}")  # Debug print: shows raw href

                absolute_url = urljoin(current_url, href)
                parsed_absolute_url = urlparse(absolute_url)

                normalized_url = (
                    parsed_absolute_url.scheme
                    + "://"
                    + parsed_absolute_url.netloc
                    + parsed_absolute_url.path
                )
                path_segments = parsed_absolute_url.path.split("/")
                last_segment = path_segments[-1] if path_segments else ""
                if not "." in last_segment and not normalized_url.endswith("/"):
                    normalized_url += "/"

                if parsed_absolute_url.query:
                    normalized_url += "?" + parsed_absolute_url.query

                link_netloc = parsed_absolute_url.netloc
                print(
                    f"  Comparing netlocs: Link '{link_netloc}' vs Base '{base_netloc}'"
                )  # Debug print: shows netlocs being compared

                if link_netloc == base_netloc:
                    print(
                        f"  Internal link candidate: {normalized_url}"
                    )  # Debug print: shows URL before adding
                    if normalized_url not in visited_urls:
                        if (
                            normalized_url not in urls_to_visit
                        ):  # Avoid adding duplicates to queue
                            urls_to_visit.append(normalized_url)
                            print(
                                f"  Adding to queue: {normalized_url}"
                            )  # Debug print: confirms addition
                        else:
                            print(f"  Already in queue, skipping: {normalized_url}")
                    else:
                        print(f"  Already visited, skipping: {normalized_url}")
                else:
                    print(
                        f"  External link or different domain, skipping: {absolute_url}"
                    )

        except requests.exceptions.RequestException as e:
            print(f"Error crawling {current_url}: {e}")
        except Exception as e:
            print(f"An unexpected error occurred for {current_url}: {e}")

    print("\nCrawling finished. Generating sitemap...")
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for url, file_path in sorted(internal_urls_with_files, key=lambda x: x[0]):
        url_entry = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_entry, "loc")
        loc.text = url

        last_mod_date = get_last_git_commit_date(file_path, web_root_dir)
        print (url, lastmod, lastmod)
        if last_mod_date:
            lastmod = ET.SubElement(url_entry, "lastmod")
            lastmod.text = last_mod_date
        else:
            lastmod = ET.SubElement(url_entry, "lastmod")
            lastmod.text = datetime.date.today().isoformat()
        print (url, lastmod)
        # You can add <changefreq> and <priority> here if you have
        # a way to determine them dynamically.
        # Example:
        # changefreq = ET.SubElement(url_entry, 'changefreq')
        # changefreq.text = "daily"
        # priority = ET.SubElement(url_entry, 'priority')
        # priority.text = "0.8"

    # Convert the XML tree to a string with pretty printing using minidom
    rough_string = ET.tostring(urlset, "utf-8")
    reparsed = minidom.parseString(rough_string)
    sitemap_string = reparsed.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")

    # Save the sitemap to a file
    sitemap_filename = "sitemap.xml"
    with open(sitemap_filename, "w", encoding="utf-8") as f:
        f.write(sitemap_string)

    print(
        f"\nSitemap generated successfully as '{sitemap_filename}' with {len(internal_urls_with_files)} URLs."
    )


def get_all_internal_links(start_url):

    paths = []
    urlToVisit = deque([start_url])
    visitedUrls = []

    while urlToVisit:
        currentUrl = urlToVisit.popleft()
        print(f"Crawling {currentUrl}")
        if currentUrl in visitedUrls:
            print(f"Skip {currentUrl} becauses already visited")
            continue

        response = requests.get(currentUrl, timeout=10)
        if response.status_code != 200:
            sys.exit(f"Invalid link detected :{currentUrl}")

        soup = BeautifulSoup(response.text, "html.parser")
        routesInPage = [link["href"] for link in soup.find_all("a", href=True)]
        # print(f"routes in page: {routesInPage}")

        for link in routesInPage:
            if (
                link.startswith("https")
                or link.startswith("mailto")
                or link == "/"
                or link.startswith("#")
            ):
                continue
            else:
                urlToVisit.append(f"{start_url}{link}")
                paths.append(link)
        visitedUrls.append(currentUrl)

    return (visitedUrls, paths)


import os
from xml.etree.ElementTree import Element, SubElement, ElementTree, tostring
from datetime import datetime, timezone


def generate_sitemap(app_url, app_domain_url, web_root_dir, all_internal_links):
    urls, file_paths = all_internal_links

    domain_links = [url.replace(app_url, app_domain_url) for url in urls]

    urlset = Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for link, file_path in zip(domain_links, file_paths):
        last_modified = get_last_git_commit_date(file_path, web_root_dir)

        url_element = SubElement(urlset, "url")

        loc = SubElement(url_element, "loc")
        loc.text = link

        if last_modified:
            lastmod = SubElement(url_element, "lastmod")
            lastmod.text = (
                last_modified  # Expected ISO 8601 string: "YYYY-MM-DDTHH:MM:SS"
            )
        if "/modele-cv" in link:
            SubElement(url_element, "changefreq").text = "weekly"
            SubElement(url_element, "priority").text = "0.8"
        elif link.endswith("/"):
            SubElement(url_element, "changefreq").text = "daily"
            SubElement(url_element, "priority").text = "1.0"
        else:
            SubElement(url_element, "changefreq").text = "monthly"
            SubElement(url_element, "priority").text = "0.5"

    return tostring(urlset, encoding="utf-8", method="xml").decode("utf-8")


if __name__ == "__main__":
    APP_URL = "http://localhost:3000"
    APP_DOMAIN_URL = "https://itugui.com"
    WEB_ROOT_DIR = os.getcwd()

    allInternalLinks = get_all_internal_links(APP_URL)
    domailLink = [link.replace(APP_URL, APP_DOMAIN_URL) for link in allInternalLinks[0]]
    print(f"All internal routes: {domailLink}")
    sitemap = generate_sitemap(APP_URL, APP_DOMAIN_URL, WEB_ROOT_DIR, allInternalLinks)
    with open("public/sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)
