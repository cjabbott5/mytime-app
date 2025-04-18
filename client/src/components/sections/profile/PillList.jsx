import { FaEdit } from 'react-icons/fa';

export default function PillList({ title, values = [], iconMap = {}, sectionKey, onEdit }) {
  return (
    <div className="bg-cloud-base/70 backdrop-blur rounded-xl p-6 border border-loop-accent w-full shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-loop-dark">{title}</h3>
        {onEdit && (
          <button
            onClick={() => onEdit({ title, sectionKey, initialValues: values })}
            className="text-loop-dark hover:text-body text-2xl"
          >
            <FaEdit />
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {values.slice(0, 3).map((item, i) => (
          <span key={i} className="bg-loop-highlight/60 text-body px-4 py-2 rounded-full flex items-center gap-2 text-lg shadow-inner border border-cloud-overlay">
            <span className="text-xl">{iconMap[item]}</span>
            {item}
          </span>
        ))}
        {values.length > 3 && (
          <span className="text-sm text-loop-dark italic">+{values.length - 3} more</span>
        )}
      </div>
    </div>
  );
}
