from bootstrapping import bootstrapping

from googlecloudsdk.command_lib.util import gcloudignore

file_chooser = gcloudignore.GetFileChooserForDir('/home/sd/guerilla-gifts/')
for f in file_chooser.GetIncludedFiles('/home/sd/guerilla-gifts/'):
    print 'uploading {}'.format(f)
