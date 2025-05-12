import "../../assets/styles/pages/project/projectCard.scss";
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // Xác định status class dựa vào trạng thái
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'project-card__status--in-progress';
      case 'on hold':
        return 'project-card__status--on-hold';
      case 'completed':
        return 'project-card__status--completed';
      case 'cancelled':
        return 'project-card__status--cancelled';
      default:
        return 'project-card__status--in-progress';
    }
  };

  // Format date để hiển thị
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // Lấy thumbnail hoặc placeholder nếu không có
  const getThumbnail = () => {
    if (project.thumbnail) {
      return <img src={project.thumbnail} alt={project.name} className="project-card__thumbnail" />;
    }
    return (
      <div className="project-card__thumbnail-placeholder">
        <span className="project-card__thumbnail-icon">📄</span>
      </div>
    );
  };

  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <div className="project-card__image-container">
        {getThumbnail()}
      </div>
      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.name}</h3>
          <span className={`project-card__status ${getStatusClass(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        <div className="project-card__info">
          <div className="project-card__client">
            <span className="project-card__label">Client:</span>
            <span className="project-card__value">{project.client}</span>
          </div>
          
          <div className="project-card__dates">
            <div className="project-card__date-item">
              <span className="project-card__label">Start Date:</span>
              <span className="project-card__value">{formatDate(project.start_date)}</span>
            </div>
            <div className="project-card__date-item">
              <span className="project-card__label">Due Date:</span>
              <span className="project-card__value">{formatDate(project.end_date)}</span>
            </div>
          </div>
          
          <div className="project-card__id">
            <span className="project-card__label">ID:</span>
            <span className="project-card__value">{project.id}</span>
          </div>
        </div>
        
        {project.members && project.members.length > 0 && (
          <div className="project-card__members">
            {project.members.slice(0, 3).map((member, index) => (
              <div key={index} className="project-card__member-avatar">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <div className="project-card__member-initial">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {project.members.length > 3 && (
              <div className="project-card__member-more">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;