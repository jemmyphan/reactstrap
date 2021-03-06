import React from 'react';
import classNames from 'classnames';
import { mapToCssModules } from './utils';

const { PropTypes } = React;
const propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  tag: 'a',
};

const PaginationLink = (props) => {
  const {
    className,
    cssModule,
    next,
    previous,
    tag: Tag,
    ...attributes,
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    'page-link'
  ), cssModule);

  let defaultAriaLabel;
  if (previous) {
    defaultAriaLabel = 'Previous';
  } else if (next) {
    defaultAriaLabel = 'Next';
  }
  const ariaLabel = props['aria-label'] || defaultAriaLabel;

  let defaultCaret;
  if (previous) {
    defaultCaret = '\u00ab';
  } else if (next) {
    defaultCaret = '\u00bb';
  }

  let children = props.children;
  if (previous || next) {
    children = [
      <span
        aria-hidden="true"
        key="caret"
      >
        {children || defaultCaret}
      </span>,
      <span
        className="sr-only"
        key="sr"
      >
        {ariaLabel}
      </span>,
    ];
  }

  return (
    <Tag
      {...attributes}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
};

PaginationLink.propTypes = propTypes;
PaginationLink.defaultProps = defaultProps;

export default PaginationLink;
