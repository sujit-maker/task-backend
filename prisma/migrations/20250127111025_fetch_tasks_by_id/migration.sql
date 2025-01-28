-- CreateTable
CREATE TABLE "_TaskUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TaskUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskUsers_B_index" ON "_TaskUsers"("B");

-- AddForeignKey
ALTER TABLE "_TaskUsers" ADD CONSTRAINT "_TaskUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskUsers" ADD CONSTRAINT "_TaskUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
