import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router"

const Breadcrumbs = ({
    items = [],
}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        <Link to="/">
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink>
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                        </BreadcrumbLink>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default Breadcrumbs