import React from 'react';
import { PersonProvider, usePersonContext } from '../context/PersonContext';
import { ModalChild, ModalChildProps } from '../lib/types/ModalChild';
import type { Person } from '../lib/types/Person';

type PersonDetailsProps = ModalChildProps<Person>;
type ModalPersonDetails = ModalChild<PersonDetailsProps>;

const ModalPersonDetails: ModalPersonDetails = ({
  children,
  modalContent: person,
}) => {
  return <PersonProvider value={person}>{children}</PersonProvider>;
};

const Head: ModalPersonDetails['ChildHead'] = () => {
  const person = usePersonContext();
  return (
    <div className="flex justify-center -mt-24 md:justify-center">
      <img
        className="flex-shrink-0 object-cover w-20 h-20 sm:w-32 sm:h-32 rounded-full shadow-xl border-3 border-primary bg-bg-2 "
        src={person.picture.large}
      />
    </div>
  );
};

const Title: ModalPersonDetails['ChildTitle'] = () => {
  const person = usePersonContext();
  return (
    <React.Fragment>{`${person.name.title}  ${person.name.last}, ${person.gender} , ${person.dob.age} y.o`}</React.Fragment>
  );
};

const Description: ModalPersonDetails['ChildDescription'] = () => {
  return (
    <span>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
      laudantium explicabo pariatur iste dolorem animi vitae error totam. At
      sapiente aliquam accusamus facere veritatis.
    </span>
  );
};

const Body: ModalPersonDetails['ChildBody'] = () => {
  const person = usePersonContext();

  const Details = React.useMemo(
    () => ({
      'Full name': (person: Person) =>
        `${person.name.first}  ${person.name.last}`,
      'Email address': (person: Person) => `${person.email}`,
      Gender: (person: Person) => person.gender,
      Birthdate: (person: Person) =>
        `${new Date(person.dob.date).toLocaleDateString()}`,
      Phone: (person: Person) => person.phone,
      Nationality: (person: Person) => `${person.nat}`,
      'Address Line': (person: Person) => {
        return `${person.location.street.number} ${person.location.street.name} `;
      },
      City: (person: Person) => person.location.city,
      State: (person: Person) => person.location.state,
      Country: (person: Person) => person.location.country,
    }),
    [],
  );

  return (
    <div className="border-t border-gray-200">
      <dl>
        {Object.entries(Details).map(([label, detail]) => (
          <div
            key={label}
            className="px-2 py-1 sm:py-3 bg-white sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 odd:bg-table-bg"
          >
            <dt className="text-sm  text-primary uppercase font-semibold">
              {label}
            </dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 ">
              {detail(person)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

ModalPersonDetails.ChildHead = Head;
ModalPersonDetails.ChildHead.displayName = 'PersonDetails.Title';

ModalPersonDetails.ChildTitle = Title;
ModalPersonDetails.ChildTitle.displayName = 'PersonDetails.Title';

ModalPersonDetails.ChildDescription = Description;
ModalPersonDetails.ChildDescription.displayName = 'PersonDetails.Description';

ModalPersonDetails.ChildBody = Body;
ModalPersonDetails.ChildBody.displayName = 'PersonDetails.Body';

export { ModalPersonDetails };
