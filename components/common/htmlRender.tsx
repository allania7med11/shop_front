import DOMPurify from 'isomorphic-dompurify';

export const HtmlRender = ({ rawHTML }) => (
  <div>{<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} />}</div>
);
