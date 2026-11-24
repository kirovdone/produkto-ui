import {
  BlockActions,
  BlockAvatar,
  Section,
  SectionHeader,
} from "../../components/Section";
import { Card } from "../../components/Card";
import { Image } from "../../components/Image";
import { Button } from "../../components/Button";
import {
  teamBioClasses,
  teamBodyClasses,
  teamCardBodyClasses,
  teamCardClasses,
  teamCardPhotoClasses,
  teamClasses,
  teamFounderBioClasses,
  teamFounderClasses,
  teamFounderNameClasses,
  teamFounderPhotoClasses,
  teamFounderTextClasses,
  teamGridClasses,
  teamLinksClasses,
  teamMemberClasses,
  teamMemberTextClasses,
  teamNameClasses,
  teamPortraitClasses,
  teamPortraitPhotoClasses,
  teamRoleClasses,
  teamRowClasses,
  teamRowTextClasses,
  teamRowsClasses,
  teamSplitClasses,
} from "./Team.classes";
import type {
  TeamLink,
  TeamListLayout,
  TeamMember,
  TeamProps,
} from "./Team.types";

const Links = ({
  links,
  layout,
  centered,
}: {
  links?: TeamLink[];
  layout: TeamListLayout;
  centered: boolean;
}) =>
  links?.length ? (
    <ul
      role="list"
      data-part="team-links"
      className={teamLinksClasses({ layout, centered })}
    >
      {links.map((link, i) => (
        <li key={`${link.link}-${i}`}>
          <Button
            appearance="transparent"
            aria-label={link.icon ? link.label : undefined}
            muted
            size="sm"
            href={link.link}
          >
            {link.icon ?? link.label}
          </Button>
        </li>
      ))}
    </ul>
  ) : null;

const Portrait = ({ member }: { member: TeamMember }) => (
  <div className={teamPortraitClasses}>
    <Image
      alt={member.name}
      className={teamPortraitPhotoClasses}
      src={member.photo ?? member.avatar}
    />
    <div className={teamMemberTextClasses()}>
      <h3 data-part="team-name" className={teamNameClasses()}>
        {member.name}
      </h3>
      {member.role && (
        <p data-part="team-role" className={teamRoleClasses()}>
          {member.role}
        </p>
      )}
    </div>
  </div>
);

const MemberCard = ({ member }: { member: TeamMember }) => (
  <Card className={teamCardClasses} data-part="team-card">
    <Image
      alt={member.name}
      className={teamCardPhotoClasses}
      src={member.photo ?? member.avatar}
    />
    <div className={teamCardBodyClasses}>
      <div className={teamMemberTextClasses()}>
        <h3 data-part="team-name" className={teamNameClasses()}>
          {member.name}
        </h3>
        {member.role && (
          <p data-part="team-role" className={teamRoleClasses()}>
            {member.role}
          </p>
        )}
      </div>
      {member.bio && (
        <div data-part="team-bio" className={teamBioClasses}>
          {member.bio}
        </div>
      )}
      <Links links={member.links} layout="grid" centered={false} />
    </div>
  </Card>
);

export const Team = ({
  members,
  layout = "grid",
  columns = 4,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: TeamProps) => {
  if (!members?.length) return null;
  if (layout === "portraits" || layout === "cards")
    return (
      <Section
        id={id}
        data-part="team"
        data-layout={layout}
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
        muted={muted}
        className={className}
      >
        <div data-part="team-body" className={teamBodyClasses}>
          <ul
            role="list"
            data-part="team-members"
            className={teamGridClasses({ columns })}
          >
            {members.map((member, i) => (
              <li key={`${member.name}-${i}`} data-part="team-member">
                {layout === "cards" ? (
                  <MemberCard member={member} />
                ) : (
                  <Portrait member={member} />
                )}
              </li>
            ))}
          </ul>
          <BlockActions actions={actions} align={align} />
        </div>
      </Section>
    );
  if (layout === "rows")
    return (
      <Section
        id={id}
        data-part="team"
        data-layout={layout}
        muted={muted}
        className={className}
      >
        <div data-part="team-split" className={teamSplitClasses}>
          <div className={teamFounderTextClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            <BlockActions actions={actions} />
          </div>
          <ul role="list" data-part="team-members" className={teamRowsClasses}>
            {members.map((member, i) => (
              <li
                key={`${member.name}-${i}`}
                data-part="team-member"
                className={teamRowClasses}
              >
                <BlockAvatar
                  name={member.name}
                  size="lg"
                  src={member.avatar ?? member.photo}
                />
                <div className={teamRowTextClasses}>
                  <h3 data-part="team-name" className={teamNameClasses()}>
                    {member.name}
                  </h3>
                  {member.role && (
                    <p data-part="team-role" className={teamRoleClasses()}>
                      {member.role}
                    </p>
                  )}
                  {member.bio && (
                    <div data-part="team-bio" className={teamBioClasses}>
                      {member.bio}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  if (layout === "founder") {
    const [founder] = members;
    if (!founder) return null;
    return (
      <Section
        id={id}
        data-part="team"
        data-layout={layout}
        muted={muted}
        className={className}
      >
        <div data-part="team-founder" className={teamFounderClasses}>
          <Image
            alt={founder.name}
            className={teamFounderPhotoClasses}
            src={founder.photo ?? founder.avatar}
          />
          <div className={teamFounderTextClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            {founder.bio && (
              <div data-part="team-bio" className={teamFounderBioClasses}>
                {founder.bio}
              </div>
            )}
            <div className={teamFounderNameClasses}>
              <p data-part="team-name" className={teamNameClasses()}>
                {founder.name}
              </p>
              {founder.role && (
                <p data-part="team-role" className={teamRoleClasses()}>
                  {founder.role}
                </p>
              )}
            </div>
            <BlockActions actions={actions} />
          </div>
        </div>
      </Section>
    );
  }
  const compact = layout === "compact";
  const centered = align === "center" && !compact;
  return (
    <Section
      id={id}
      data-part="team"
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div data-part="team-body" className={teamBodyClasses}>
        <ul
          role="list"
          data-part="team-members"
          className={teamClasses({
            layout,
            columns,
            sparse: centered && members.length < columns,
          })}
        >
          {members.map((member, i) => {
            const links = (
              <Links links={member.links} layout={layout} centered={centered} />
            );
            return (
              <li
                key={`${member.name}-${i}`}
                data-part="team-member"
                className={teamMemberClasses({ layout, centered })}
              >
                <BlockAvatar
                  name={member.name}
                  size={compact ? "lg" : "xl"}
                  src={member.avatar}
                />
                <div
                  data-part="team-member-text"
                  className={teamMemberTextClasses({ layout })}
                >
                  <h3
                    data-part="team-name"
                    className={teamNameClasses({ layout })}
                  >
                    {member.name}
                  </h3>
                  {member.role && (
                    <p
                      data-part="team-role"
                      className={teamRoleClasses({ layout })}
                    >
                      {member.role}
                    </p>
                  )}
                  {compact && links}
                </div>
                {!compact && links}
              </li>
            );
          })}
        </ul>
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  );
};
