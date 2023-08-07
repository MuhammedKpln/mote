import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { FiSearch } from "react-icons/fi";

export function DashboardHeaderSearch() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <FiSearch />
      </button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ">
                <form action="#" className="m-5">
                  <div id="form" className="flex mb-10">
                    <Input placeholder="Search for notes.." autoFocus />
                    <button type="submit" className="btn primary">
                      Search
                    </button>
                  </div>
                </form>
              </ModalHeader>
              <ModalBody>
                <div id="results">
                  <h1 className="font-semibold text-lg">Results: </h1>

                  <div>
                    {/* <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry />
                    <SingleEntry /> */}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="submit" className="btn secondary">
                  Search
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
