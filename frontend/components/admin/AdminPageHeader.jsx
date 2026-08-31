import BackButton from "@/components/ui/BackButton";

const AdminPageHeader = ({ breadcrumb, title, subtitle, backLink }) => {
    return (
        <div className="flex flex-col gap-2 lg:gap-3 p-4 lg:p-6">
            <span className="text-neutral-700 text-sm font-sans font-medium">{breadcrumb}</span>
            <div className="flex items-center gap-4 lg:gap-6">
                {backLink && <BackButton href={backLink} />}

                <div className="flex flex-col gap-2 lg:gap-3">
                    <h1 className="font-display text-neutral-950 text-4xl lg:text-5xl font-bold">{title}</h1>
                    <p className="text-neutral-700 font-sans text-sm lg:text-base">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};
export default AdminPageHeader;