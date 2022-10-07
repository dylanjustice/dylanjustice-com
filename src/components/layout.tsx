import * as React from "react";
import { Link, PageProps } from "gatsby";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

deckDeckGoHighlightElement();

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface LayoutProps extends React.PropsWithChildren {
	location: any;
	title: string;
}
// #endregion Interfaces
const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
	const { location, title, children } = props;
	const rootPath = `${__PATH_PREFIX__}/`;
	const isRootPath = location.pathname === rootPath;
	let header;

	if (isRootPath) {
		header = (
			<h1 className="main-heading">
				<Link to="/">{title}</Link>
			</h1>
		);
	} else {
		header = (
			<Link className="header-link-home" to="/">
				{title}
			</Link>
		);
	}

	return (
		<div className="global-wrapper" data-is-root-path={isRootPath}>
			<header className="global-header">{header}</header>
			<main>{children}</main>
			<footer>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.com">Gatsby</a>
			</footer>
		</div>
	);
};

export default Layout;
