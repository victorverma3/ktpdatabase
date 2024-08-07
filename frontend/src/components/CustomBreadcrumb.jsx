import PropTypes from "prop-types";

const CustomBreadcrumb = ({ previous, current }) => {
    return (
        <div className="p-3 flex flex-wrap">
            {previous.map((page, index) => (
                <p key={index} className="mr-1">
                    <a
                        href={page.path}
                        className="text-[#234c8b] hover:text-[#458eff] duration-200 ease-linear"
                    >
                        {page.title}
                    </a>
                    {" /"}
                </p>
            ))}

            <p>{current}</p>
        </div>
    );
};

CustomBreadcrumb.propTypes = {
    previous: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
};

export default CustomBreadcrumb;
