import clsx from "clsx";

export default function Icon(props) {
  const { symbol, className, label, style, ...restProps } = props;
  const classes = clsx(className, "icon", `icon--${symbol}`);

  if (symbol.startsWith("fa")) {
    return (
      <i
        className={clsx(classes, "fa", symbol)}
        aria-label={label}
        aria-hidden={label ? undefined : "true"}
        {...restProps}
      />
    );
  }

  const ariaProps = label
    ? {
        role: "img",
        "aria-label": label,
      }
    : {
        "aria-hidden": "true",
        focusable: "false",
      };

  return (
    <span className={classes} style={props.style}>
      <svg {...ariaProps} {...restProps}>
        <use xlinkHref={`#${symbol}`} />
      </svg>
    </span>
  );
}
