import SectionHeading from "./SectionHeading";

export default function PageHeader({ title, subtitle, eyebrow = "Page", compact = false }) {
  return (
    <SectionHeading
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      compact={compact}
    />
  );
}
