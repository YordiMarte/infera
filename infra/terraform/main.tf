provider "aws" {
  region = "us-east-1"
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "infera-cluster"
  cluster_version = "1.29"
  subnet_ids      = ["subnet-xxx", "subnet-yyy"]
  vpc_id          = "vpc-xxx"
}