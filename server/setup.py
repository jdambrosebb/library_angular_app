import setuptools

setuptools.setup(
  name="library_app_server",
  version="1.0.0",
  description="Applies mock database API for library app",
  packages=setuptools.find_packages('src'),
  package_dir={'':'src'}
)
