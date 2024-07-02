"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/utils/capitalize";
import { useSession } from "next-auth/react";

function MyBreadcum() {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    status === "authenticated" && (
      <Breadcrumb separator="›">
        <BreadcrumbList
          aria-label="breadcrumb"
          className="flex items-start justify-start mb-5"
        >
          {pathname.split("/").map(
            (path, index) =>
              index > 0 && (
                <BreadcrumbItem key={path + index}>
                  <BreadcrumbLink>
                    {index !== pathname.split("/").length - 1 ? (
                      <Link href={`/${path}`}>{capitalize(path)}</Link>
                    ) : (
                      capitalize(path)
                    )}
                  </BreadcrumbLink>
                  {index < pathname.split("/").length - 1 && (
                    <BreadcrumbSeparator>›</BreadcrumbSeparator>
                  )}
                </BreadcrumbItem>
              )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
}

export default MyBreadcum;
