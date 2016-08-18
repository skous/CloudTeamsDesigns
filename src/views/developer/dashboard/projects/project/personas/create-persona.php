<!-- Pop-up modal: team member full profile -->
<div id="new" class="popup-create-new-persona modal fade" role="dialog">
	<div class="modal-dialog medium">
		<div class="block block-fill">
			<header class="modal-header">
				<div class="vertical-align">
					<div class="middle">
						<i class="icon icon-user"></i>
						<h2 class="header-medium secondary">Create a new persona</h2>
					</div>
					<div class="close" data-dismiss="modal">
						<i class="icon icon-close"></i>
					</div>
				</div>
			</header>

			<div class="modal-body">
				<ul class="menu-subpage">
					<li id="link-to-subpage-1" class="link-to-subpage active">Basic information</li>
					<li id="link-to-subpage-2" class="link-to-subpage">Properties</li>
				</ul>

				<section id="subpage-1" class="subpage active">
					<div class="col-md-6">

						<fieldset class="form-group fieldset-upload">

							<div class="input-container">
								<label class="file-upload-image" for="file-upload">
									<div class="vertical-align">
										<div class="middle">
											<div class="add-image-button">
												<i class="icon icon-plus"></i>
											</div>
											<p class="meta big">Add picture</p>
										</div>
									</div>
								</label>
								<input type="file" name="file-upload" id="file-upload"/>
							</div>
						</fieldset>

					</div>
					<div class="col-md-6">
						
						<fieldset>
							<label for="add-persona-name" class="header-medium secondary">Name</label>

							<div class="input-container">
								<input type="text" id="add-persona-name" placeholder="Persona name"></textarea>
							</div>
						</fieldset>

						<fieldset class="form-group fieldset-radio">
							<label for="privacy-settings" class="header-medium secondary">Persona profile settings</label>

							<div class="row">
								<div class="col-sm-6">
									<div class="input-container">
										<label for="import-url"><input type="radio" name="privacy-settings" value='import-url' id="import-url" checked="checked"><span></span>Private</label>	
									</div>
								</div>
								<div class="col-sm-6">
									<div class="input-container">
										<label for="fetch-document"><input type="radio" name="privacy-settings" value='fetch-document' id="fetch-document"><span></span>Public</label>
									</div>
								</div>
							</div>
						</fieldset>	

						<fieldset>
							<label for="tags-persona" class="header-medium secondary">Description</label>

							<div class="input-container">
								<input type="text" id="tags-persona" placeholder="Persona description"></textarea>
							</div>
						</fieldset>

					</div>
					<div class="col-md-12">
						<fieldset class="form-group form-submit">
							<a href="#nowhere" data-dismiss="modal" class="btn-transparent" alt="cancel">Cancel</a>
							<a href="#nowhere" data-dismiss="modal" class="btn confirm-button" alt="create">Create</a>
						</fieldset>
					</div>
				</section>

				<section id="subpage-2" class="subpage">

					<div class="col-md-12 inform-block">
					Define some or all of the properties below to describe this persona
					</div>

					<div class="col-md-6">

						<fieldset>
							<label for="persona-gender" class="header-medium secondary">Gender</label>

							<div class="input-container">
								<input type="text" id="persona-gender" placeholder="Persona gender"></textarea>
							</div>
						</fieldset>

						<fieldset>
							<label for="persona-tech-level" class="header-medium secondary">Tech level</label>

							<div class="input-container">
								<input type="text" id="apersona-tech-level" placeholder="Tech level of persona"></textarea>
							</div>
						</fieldset>

						<fieldset>
							<label for="add-url-name" class="header-medium secondary">Name</label>

							<div class="input-container">
								<input type="text" id="add-url-name" placeholder="Name your URL"></textarea>
							</div>
						</fieldset>

						<fieldset>
							<label for="add-url-name" class="header-medium secondary">Name</label>

							<div class="input-container">
								<input type="text" id="add-url-name" placeholder="Name your URL"></textarea>
							</div>
						</fieldset>

						<fieldset>
							<label for="add-url-name" class="header-medium secondary">Name</label>

							<div class="input-container">
								<input type="text" id="add-url-name" placeholder="Name your URL"></textarea>
							</div>
						</fieldset>

					</div>

					<div class="col-md-6">
					
					</div>

					<div class="col-md-12">
						<fieldset class="form-group form-submit">
							<a href="#nowhere" data-dismiss="modal" class="btn-transparent" alt="cancel">Cancel</a>
							<a href="#nowhere" data-dismiss="modal" class="btn confirm-button" alt="create">Create</a>
						</fieldset>
					</div>

				</section>
			</div>
		</div>
	</div>
</div>