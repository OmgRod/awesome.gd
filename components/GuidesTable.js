import Link from 'next/link';
import { Table, THead, TBody, TR, TH, TD } from './WikiTable';

export default function GuidesTable({ guides = [] }) {
  if (!guides.length) {
    return <p>No guides are available yet.</p>;
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>Title</TH>
          <TH>Description</TH>
        </TR>
      </THead>
      <TBody>
        {guides.map((guide) => (
          <TR key={guide.route}>
            <TD>
              <Link
                href={guide.route}
                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
              >
                {guide.title}
              </Link>
            </TD>
            <TD>{guide.description || 'No description provided.'}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
