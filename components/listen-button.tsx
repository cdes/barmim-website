interface ListenButtonProps {
  text: string;
  url: string;
  icon: React.ReactNode;
}
const ListenButton = ({ text, icon, url }: ListenButtonProps) => (
  <a
    href={url}
    target="_blank"
    className="inline-flex flex-row justify-start rounded-xl border border-gray-300 px-2 h-12 hover:bg-gray-300"
    title={`استمع على ${text}`}
  >
    {icon}
    <div className="mr-2 flex flex-col">
      <span className="mb-2 text-xs leading-none text-gray-600 h-3 mt-2">
        استمع على
      </span>
      <span className="text-base text-gray-900 font-bold h-2 leading-none -mt-1">
        {text}
      </span>
    </div>
  </a>
);
export default ListenButton;
