export type SidebarProps = {
    files: string[];
}

export const Sidebar = ({files}: SidebarProps) => {
    return (
    <div className="border-r-2 border-black p-3 h-screen left-0">
            {files.map((file) => <button className="w-full hover:bg-gray-200">{file}</button>)}
    </div>)
}