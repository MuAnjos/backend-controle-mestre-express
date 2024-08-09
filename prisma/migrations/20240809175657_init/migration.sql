/*
  Warnings:

  - The values [ATENDENDTE] on the enum `CargoFuncionario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CargoFuncionario_new" AS ENUM ('GERENTE', 'ATENDENTE');
ALTER TABLE "Funcionario" ALTER COLUMN "cargo" TYPE "CargoFuncionario_new" USING ("cargo"::text::"CargoFuncionario_new");
ALTER TYPE "CargoFuncionario" RENAME TO "CargoFuncionario_old";
ALTER TYPE "CargoFuncionario_new" RENAME TO "CargoFuncionario";
DROP TYPE "CargoFuncionario_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_enderecoId_fkey";

-- AlterTable
ALTER TABLE "Funcionario" ALTER COLUMN "enderecoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
