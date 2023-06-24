﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using TF2ServerBrowserAPI.Models;

#nullable disable

namespace TF2ServerBrowserAPI.Migrations
{
    [DbContext(typeof(GrouchDBContext))]
    partial class GrouchDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TF2ServerBrowserAPI.Models.AuthorizedUsers", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecordId"));

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.HasKey("RecordId");

                    b.ToTable("AuthorizedUsers");
                });

            modelBuilder.Entity("TF2ServerBrowserAPI.Models.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("PrimaryColor")
                        .IsRequired()
                        .HasColumnType("nchar(7)");

                    b.Property<string>("SecondaryColor")
                        .IsRequired()
                        .HasColumnType("nchar(7)");

                    b.HasKey("Id");

                    b.ToTable("Color");
                });

            modelBuilder.Entity("TF2ServerBrowserAPI.Models.Login", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecordId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.HasKey("RecordId");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("TF2ServerBrowserAPI.Models.Server", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<Point>("GPS")
                        .IsRequired()
                        .HasColumnType("geography");

                    b.Property<string>("IP")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Map")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<int>("Players")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Server");
                });
#pragma warning restore 612, 618
        }
    }
}
