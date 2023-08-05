import { IChipVariant } from "@/models/chip.model";
import userPic from "@/public/user.jpg";
import styles from "@/styles/single_entry.module.scss";
import Image from "next/image";
import { Chip } from "./chip";
import Link from "next/link";

export function SingleEntry() {
  return (
    <Link href="/dashboard/notes/selam">
      <div className="flex border rounded-md p-5 justify-between m-auto mb-5 hover:bg-gray-100">
        <div className="flex flex-col">
          <div id="header" className="flex ">
            <div id="title" className="font-semibold text-md">
              <h1>My main project</h1>
            </div>
            <div id="chip" className={styles.chip}>
              <Chip label="Test" />
            </div>
            <div id="chip" className={styles.chip}>
              <Chip label="Submitted" type={IChipVariant.WARNING} />
            </div>
            <div id="chip" className={styles.chip}>
              <Chip label="Test" type={IChipVariant.ERROR} />
            </div>
            <div id="chip" className={styles.chip}>
              <Chip label="Test" type={IChipVariant.SUCCESS} />
            </div>
          </div>

          <div id="description" className="flex">
            <h6 className="text-gray-600 text-sm">
              Management of projects under “Can-it” brand •
            </h6>
          </div>
        </div>

        <div className="flex my-auto">
          <Image
            alt="user"
            width={20}
            height={20}
            src={userPic}
            className="rounded-full cursor-pointer"
          />

          <div className="text-sm text-gray-600 pl-5">12 Jan, 2023</div>
        </div>
      </div>
    </Link>
  );
}
