interface BadgeProps {
  name: string;
  position: string;
  department: string;
}

export const Badge = ({ name, position, department }: BadgeProps) => {
  return (
    <div className="badge visible" id="badge-container">
      <div className="badge-header">
        <img src="/lumon-logo.svg" alt="Lumon Industries" className="badge-logo" />
      </div>
      <div className="badge-content">
        <div className="badge-photo-container">
          <img src="/placeholder-photo.svg" alt="Employee" className="badge-photo" id="badge-photo" />
        </div>
        <div className="badge-info">
          <div className="badge-name" id="badge-name">{name}</div>
          <div className="badge-position" id="badge-position">{position}</div>
          <div className="badge-department" id="badge-department">{department}</div>
        </div>
      </div>
      <div className="badge-footer">
        <img src="/barcode.svg" alt="Barcode" className="barcode-img" />
      </div>
    </div>
  );
};
