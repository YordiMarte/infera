import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Usage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  apiKey!: string;

  @Column()
  model!: string;

  @Column()
  promptTokens!: number;

  @Column()
  completionTokens!: number;

  @Column()
  totalTokens!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
