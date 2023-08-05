import { IBreadcrumb } from "@/models/breadcrumb.model";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

interface ICrumbProps {
  last: boolean;
  text: string;
  href: string;
}

const _defaultGetDefaultTextGenerator = (path: string) =>
  path.charAt(0).toUpperCase() + path.slice(1);

// Pulled out the path part breakdown because its
// going to be used by both `asPath` and `pathname`
const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

export default function NextBreadcrumbs({
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) {
  const pathName = usePathname();

  const breadcrumbs = useMemo<IBreadcrumb[]>(() => {
    const asPathNestedRoutes = generatePathParts(pathName);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      return {
        href,
        text: getDefaultTextGenerator(subpath),
      };
    });

    return [...crumblist];
  }, [pathName, getDefaultTextGenerator]);

  useEffect(() => {
    console.log(breadcrumbs);
  });

  return (
    <div aria-label="breadcrumb" className="flex">
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </div>
  );
}

function Crumb(props: ICrumbProps) {
  if (props.last) {
    return <h1 className="align-center text-md font-semibold">{props.text}</h1>;
  }

  return (
    <Link
      color="inherit"
      href={props.href}
      className="mr-2 after:content-['_/']  text-md text-gray-500"
    >
      {props.text}
    </Link>
  );
}
